import React from "react";

export default function UserNotRegisteredError() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-brand-cream px-6">
      <div className="text-center max-w-md">
        <h1 className="font-heading text-2xl font-bold mb-3">Account not registered</h1>
        <p className="text-foreground/60">
          Your account hasn't been registered for this app yet. Please contact the site administrator.
        </p>
      </div>
    </div>
  );
}