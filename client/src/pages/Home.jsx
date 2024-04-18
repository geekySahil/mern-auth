import React from 'react'

export default function Home() {
  return (
    <div className='px-4 py-12 max-w-2xl  mx-auto'>
      <h1 className='text-3xl font-bold mb-4 text-slate-900'>An auth project using mern stack</h1>

      <p className='mb-4'>An Authentication app built with the MERN stack serves as a secure platform for users to register, log in, and access protected resources. In this project, the MERN stack refers to MongoDB as the database, Express.js as the backend framework, React.js for the frontend, and Node.js for server-side scripting.</p>
      <p className='mb-4'>The app begins with a user-friendly interface where individuals can sign up by providing necessary information like username, email, and password. Passwords are securely hashed before storage in the MongoDB database to ensure data protection. Upon successful registration, users can log in using their credentials.</p>
     
      <p className='mb-4'>Overall, this Authentication app offers a robust solution for managing user accounts and ensuring secure access to protected resources, all while leveraging the power and flexibility of the MERN stack.</p>
    </div>
  )
}
