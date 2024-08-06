# Assessment Robin

## Project set-up

This project uses pnpm as package manager.

- Install dependencies: `pnpm i`
- Start the application: `pnpm dev:app`
- Start the GraphQL API: `pnpm dev:api`

Or start application and API simultaneously: `pnpm dev`

## Exercise

**Objective:**

- Design a MongoDB schema and write queries that demonstrate your understanding of NoSQL data modeling and efficient query architecture.
- Demonstrate your proficiency in building backend services using NestJS with TypeScript.
- Showcase your expertise in building front-end applications using React.

**Scenario:**

You are tasked with creating a simple blog application that has the following features:

- Users can create posts.
- Each post can have multiple comments.
- Users can like posts and comments.

**Tasks:**

1. MongoDB Schema Design:

   - Design a MongoDB schema for the blog application using the scenario above. Create the necessary collections and fields. Consider relationships and indexing strategies to ensure efficient queries.
   - Provide a brief explanation of your design choices and how they support the application's functionality and performance.

2. Mongoose Query Architecture:

   - Write a mutation to add a new post to the application
   - Write a mutation to add a new comment to a specific post.
   - Write a mutation to like a specific post or comment.
   - Write a query to fetch all posts including the number of likes each post has, the posts comments and the number of likes each comment has.
   - Write a query to find the most liked post in the application.

3. React Components:

   - Update the `<Article />` component to display a button to like a post.
   - Update the `<Article />` component to display the number of likes a post has.
   - Update the `<Article />` component to display an input to add a comment to a post.
   - Update the `<Article />` component to display the comments of a post.
   - Update the `<Article />` component to display a button to like a comment.
   - Update the `<Article />` component to display the number of likes each comment has.
   - Ensure components are optimized for performance (use React hooks and memoization where appropriate).

**Evaluation Criteria**:

- Schema design quality, efficiency of queries, and clarity of explanations.
- Component design, state management, performance optimizations, and styling.
- User interface and experience
- Code quality & technical best practices
- Usage of Typescript
- Communication about your approach

**Deliverables:**

- Code on GitHub
  - MongoDB schema files in the NestJS-project
  - Explanation of schema design choices (short write-up in comments)
  - MongoDB queries as specified above, available for use in the `ArticlesService` in the NestJS-project.
  - React components as specified above, implemented in the React-project.
- GitHub commit history
  - A commit history that reflects the development process, showcasing thoughtful progress, and adherence to best coding practices.
- Timesheet
  - A documented timesheet or log of hours spent on various aspects of the project, providing insight into the development effort and time management.
- Live demo
  - A live demonstration of the application's functionality

> **FYI: Usage of Microsoft GitHub Copilot is endorsed, not prohibited.**
