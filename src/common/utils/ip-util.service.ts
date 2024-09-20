import { Injectable, Req } from '@nestjs/common';
import { Request } from 'express';

@Injectable()
export class IpUtilService {
  getClientIp(@Req() request: Request): string {
    const xForwardedFor = request.headers['x-forwarded-for'];
    const ip = Array.isArray(xForwardedFor) ? xForwardedFor[0] : xForwardedFor;

    return (
      ip ||
      request.connection.remoteAddress ||
      request.socket.remoteAddress ||
      'IP not found'
    );
  }
}
