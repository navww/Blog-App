# Modern Blog Application

A feature-rich blog application built with React that allows users to read, like, and comment on blog posts. The application includes user authentication, real-time notifications, and a responsive design.

## Features

- 📱 Responsive design that works on all devices
- 🔐 User authentication (login/register)
- ❤️ Like/unlike blog posts
- 💬 Comment on blog posts
- 🔍 Search functionality
- 🔔 Toast notifications for user actions
- 🌍 Related country information for each post
- 🎨 Modern and clean UI

## Tech Stack

- React.js
- React Router for navigation
- Context API for state management
- Axios for API calls
- CSS3 with modern features
- LocalStorage for data persistence

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone https://github.com/navww/Blog-App.git
```

2. Navigate to the project directory:
```bash
cd blog-app
```

3. Install dependencies:
```bash
npm install
# or
yarn install
```

4. Start the development server:
```bash
npm run dev
# or
yarn run dev
```

5. Open [http://localhost:5173/](http://localhost:5173/) in your browser.

## Project Structure

```
blog-system/
├── src/
│   ├── components/
│   │   ├── BlogList.jsx
│   │   ├── BlogDetail.jsx
│   │   ├── Login.jsx
│   │   ├── Register.jsx
│   │   └── Toast.jsx
│   ├── context/
│   │   └── AuthContext.jsx
│   ├── styles.css
│   └── App.jsx
├── public/
└── package.json
```

## Features in Detail

### Authentication
- User registration with email and password
- Secure login system
- Protected routes for authenticated users
- Persistent login state

### Blog Posts
- View list of blog posts
- Search posts by title
- Read full post details
- Like/unlike posts with persistent state
- View related country information

### Comments
- Add comments on blog posts
- View all comments on a post
- Real-time comment updates
- User attribution for comments

### UI/UX
- Clean and modern design
- Responsive layout for all screen sizes
- Smooth animations and transitions
- Toast notifications for user actions
- Loading states and error handling

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- [JSONPlaceholder](https://jsonplaceholder.typicode.com/) for the demo API
- [REST Countries](https://restcountries.com/) for country data
- React community for amazing tools and libraries
