import { Repository } from 'typeorm';
import { User } from '../entities/user.entity';

export class UserRepository extends Repository<User> {
  // Métodos personalizados aquí este es un repo personalizado los metodos que agregue se suamaran a los del repo base
}
