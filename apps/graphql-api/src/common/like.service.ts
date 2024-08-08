import { Injectable, NotFoundException } from '@nestjs/common';
import { UserService } from '../users/user.service';
import { Document, Model } from 'mongoose';

export interface BaseDocument extends Document {
  _id: string;
}

export interface LikeableDocument extends BaseDocument {
  likes: Array<{ _id: string }>;
}

@Injectable()
export class LikeService {
  constructor(private userService: UserService) {}

  async toggleLike<T extends LikeableDocument>(
    model: Model<T>,
    id: string,
    userId: string
  ): Promise<T> {
    const document = await model.findById(id);

    if (!document) {
      throw new NotFoundException(`Document with ID ${id} not found`);
    }

    const user = await this.userService.findById(userId);

    if (!user) {
      throw new NotFoundException(`User with ID ${userId} not found`);
    }

    const userAlreadyLiked = document.likes.some(
      u => u._id.toString() === userId
    );

    if (userAlreadyLiked) {
      document.likes = document.likes.filter(u => u._id.toString() !== userId);
    } else {
      document.likes.push({ _id: userId });
    }

    return document.save();
  }
}
