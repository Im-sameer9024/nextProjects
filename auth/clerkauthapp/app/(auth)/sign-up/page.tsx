import { SignUp } from '@clerk/nextjs';
import React from 'react'

const SignUpPage = () => {
  return (
    <div>
      <SignUp
        appearance={{
          elements: {
            header: {
              display: "none",
            },
            footer: {
              display: "none",
            },
            card: {
              boxShadow: "none",
              border: "none",
              backgroundColor: "transparent",
            },
            formButtonPrimary: {
              backgroundColor: "#F9C63D",
              color: "#000",
              ":hover": {
                backgroundColor: "#E5B23A",
              },
            },
          },
        }}
      />
    </div>
  );
}

export default SignUpPage
