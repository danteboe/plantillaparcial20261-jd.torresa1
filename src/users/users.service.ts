import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { Post } from '../posts/entities/post.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { CreatePostDto } from './dto/create-post.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRepository(Post)
    private readonly postRepository: Repository<Post>,
  ) {}

  async createUser(dto: CreateUserDto) {
    const user = this.userRepository.create({
      username: dto.username,
      bio: dto.bio ?? null,
      followers: dto.followers ?? 0,
    });
    return this.userRepository.save(user);
  }

  async findUsers() {
    return this.userRepository.find({ relations: ['posts'] });
  }

  async createPost(userId: number, dto: CreatePostDto) {
    const user = await this.userRepository.findOneBy({ id: userId });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    const post = this.postRepository.create({
      caption: dto.caption,
      likes: dto.likes ?? 0,
      user,
    });

    return this.postRepository.save(post);
  }

  async findUserPosts(userId: number) {
    const user = await this.userRepository.findOneBy({ id: userId });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    return this.postRepository.find({
      where: { user: { id: userId } },
      relations: ['comments'],
    });
  }
}
