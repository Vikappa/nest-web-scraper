import { Injectable } from '@nestjs/common';
import { PlaylistDiVincenzoResponse } from './utils/customTypes';

@Injectable()
export class AppService {
  getHello(): PlaylistDiVincenzoResponse {
    const playlistDiVincenzo: string[] = [
      'https://www.youtube.com/watch?v=6XJkPtxqWM8',
      'https://www.youtube.com/watch?v=2YllipGl2Is',
      'https://www.youtube.com/watch?v=w7yG1P2Nq_w',
      'https://www.youtube.com/watch?v=FglU0X-Vyrw',
      'https://www.youtube.com/watch?v=Cq56o0YH3mE',
      'https://www.youtube.com/watch?v=MM0kvuITNx8',
      'https://www.youtube.com/watch?v=RUJ75jeTQ1A',
      'https://www.youtube.com/watch?v=i3Jv9fNPjgk',
      'https://www.youtube.com/watch?v=QYueeJHSHSo',
      'E in genere ogni due ore mi faccio pure una pausa!',
    ];

    return { playlistDiVincenzo };
  }
}
