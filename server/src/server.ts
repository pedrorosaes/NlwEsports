import express from 'express';
import cors from 'cors';
import { PrismaClient} from '@prisma/client';
import { convertHourStringToMinutes } from './utils/convert-hour-string-to-minutes';
import { convertHourStringToMinuteString } from './utils/convert-minutes-to-hours-string'


const app = express(); 
app.use(cors());

app.use(express.json());

const prisma = new PrismaClient({
  log: ['query'],
});

app.get('/games', async (request, response) => {
  const games = await prisma.game.findMany({
    include: {
      _count: {
        select: {
          Ad: true,
        }
      }
    }
  });
  return response.json(games);
})

app.post('/games/:id/ads', async (request, response) => {
  const gameId = request.params.id;
  const body: any = request.body;

  const ad = await prisma.ad.create({
    data: {
      gameId,
      id: '123',
      name: body.name,
      yearPlaying: body.yearPlaying,
      discord: body.discord,
      weekdays: body.weekdays.join(','),
      hourStart: convertHourStringToMinutes(body.hourStart),
      hourEnd: convertHourStringToMinutes(body.hourEnd),
      useVoiceChannel: body.useVoiceChannel,
    }
  })

  return response.status(201).json(ad);
})

app.get('/games/:id/ads', async (request, response) => {
  const gameId = request.params.id;

  const ads = await prisma.ad.findMany({
    select: {
      id: true,
      name: true,
      weekdays: true,
      useVoiceChannel: true,
      yearPlaying: true,
      hourStart: true,
      hourEnd: true,
    },
    where: {
      gameId,
    },
    orderBy: {
      createdAt: 'desc',
    }
  })

  return response.json(ads.map(ad => {
    return {
      ...ad,
      weekDays: ad.weekdays.split(','),
      hourStart: convertHourStringToMinuteString(ad.hourStart),
      hourEnd: convertHourStringToMinuteString(ad.hourEnd),
    }
}));

});

app.get('/ads/:id/discord', (request, response) => {
  const adId = request.params.id;

  const ad = prisma.ad.findUniqueOrThrow({
    select: {
      discord: true,
    },
    where: {
      id: adId,
    }
  })
  return response.json({
    discord: ad,
  });

});
app.listen(3333);