import { Injectable, NotFoundException } from '@nestjs/common';
import { UserService } from '../users/user.service';
import { Document, Model } from 'mongoose';

/**
 * BaseDocument is an interface extending Mongoose's Document, representing
 * the base structure of any document with an _id field of type string.
 */
export interface BaseDocument extends Document {
  _id: string;
}

/**
 * LikeableDocument is an interface extending BaseDocument, representing
 * a document that can be "liked". It includes a likes array containing user IDs.
 */
export interface LikeableDocument extends BaseDocument {
  likes: Array<{ _id: string }>;
}

@Injectable()
/**
 * LikeService handles the business logic for toggling likes on a document.
 * It allows users to like or unlike a document, such as a post or comment.
 */
export class LikeService {
  constructor(private userService: UserService) {}

  /**
   * Toggles the like status of a document for a specific user.
   *
   * @template T - A type that extends LikeableDocument.
   * @param model - The Mongoose model representing the document type.
   * @param id - The ID of the document to toggle like status on.
   * @param userId - The ID of the user toggling the like status.
   * @returns A promise that resolves to the updated document.
   * @throws NotFoundException if the document or user is not found.
   */
  async toggleLike<T extends LikeableDocument>(
    model: Model<T>,
    id: string,
    userId: string
  ): Promise<T> {
    // Find the document by ID
    const document = await model.findById(id);

    // Throw an error if the document is not found
    if (!document) {
      throw new NotFoundException(`Document with ID ${id} not found`);
    }

    // Find the user by ID
    const user = await this.userService.findById(userId);

    // Throw an error if the user is not found
    if (!user) {
      throw new NotFoundException(`User with ID ${userId} not found`);
    }

    // Check if the user has already liked the document
    const userAlreadyLiked = document.likes.some(
      u => u._id.toString() === userId
    );

    // Toggle the like status
    if (userAlreadyLiked) {
      // Remove the user's like if they have already liked the document
      document.likes = document.likes.filter(u => u._id.toString() !== userId);
    } else {
      // Add the user's like if they have not liked the document
      document.likes.push({ _id: userId });
    }

    // Save and return the updated document
    return document.save();
  }
}
