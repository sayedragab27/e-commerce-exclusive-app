"use client";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import React from "react";
import { RefreshCcw } from "lucide-react"; // A good icon for "try again"

export default function error({
  error,
  reset,
}: {
  error: Error;
  reset: () => void;
}) {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen text-center p-4 bg-gray-50">
      <div className="bg-white p-8 rounded-lg shadow-md max-w-lg w-full">
        <h1 className="text-4xl font-bold text-red-600 mb-4">
          Oops, something went wrong!
        </h1>
        <p className="text-lg text-gray-700 mb-6">
          We are sorry, it looks like there was an issue loading the products.
          Do not worry, we are on it!
        </p>
        <div className="bg-red-100 border border-red-200 text-red-700 px-4 py-3 rounded-md mb-6">
          <p className="font-semibold">Error Details:</p>
          <p className="text-sm italic">{error.message}</p>
        </div>
        <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4">
          {/* Refresh/Try Again button */}
          <Button onClick={reset} variant="default" className="cursor-pointer">
            <RefreshCcw className="mr-2 h-4 w-4" /> Try Again
          </Button>
          {/* Go Home button */}
          <Button asChild variant="destructive" className="cursor-pointer">
            <Link href="/">Go Home</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
