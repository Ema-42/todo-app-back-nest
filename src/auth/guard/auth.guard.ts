import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private readonly jwtService: JwtService) {}
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const token = this.extractTokenFromHeader(request);

    if (!token) {
      throw new UnauthorizedException();
    }
    try {
      const payload = await this.jwtService.verifyAsync(
        token /* omitimos porque ya se condiguro en module de otra manera async, {
        secret: jwtConstants.secret,
      } */,
      );
      request.user = payload;
    } catch (error) {
      throw new UnauthorizedException();
    }

    return true;
  }
  private extractTokenFromHeader(request: Request) {
    const [type, token] = request.headers.authorization?.split(' ') ?? [];
    //console.log('auth : ', request.headers.authorization);
    return type === 'Bearer' ? token : undefined;
  }
}
