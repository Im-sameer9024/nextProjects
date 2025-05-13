import React from 'react'
import {SignIn} from "@clerk/nextjs";
const SignInPage = () => {
  return (
    <div>
      <SignIn
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
              backgroundColor: "#F9F9F9",
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

export default SignInPage
