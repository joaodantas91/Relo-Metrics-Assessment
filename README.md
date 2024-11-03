# Image Annotation Analyzer - Front-End Coding Challenge

## Overview

  

This project is a front-end challenge developed using React, TypeScript, and Vite.
  

## Installation

  

To set up this project locally, follow these steps:

  

1.  **Clone the repository:**

```bash

git clone https://github.com/joaodantas91/Relo-Metrics-Assessment

```

2.  **Navigate into the project directory:**

```bash

cd yourproject

```

3.  **Install dependencies:**

```bash

npm install

```

## Usage

  

To start using the application:

  

1.  **Run the Development Server:**

```bash

npm run dev

```

2.  **Build for Production:**

```bash

npm run build

```

This command creates a production-ready build in the `dist` directory.

  

3.  **Preview Production Build:**

```bash

npm run preview

```

This command serves the production build locally for testing.

## Process and Choices

When I started reading the test, the first thing I thought of was using a canvas to render the selection. The canvas was rendered over the image and matched the image’s dimensions. As I neared the end of the test, I realized I was using relative sizes and that the images were being resized to fit within the container. To address this, I used proportional calculations to convert the selection sizes relative to the original image dimensions. This way, regardless of the rendered size of the image and canvas, the values would be accurate for the source image as well.

For category searching, I integrated a library for fuzzy search to improve usability. This allows users to search categories by name or ID, even with minor typos, similar to SQL's "LIKE" functionality.

This project was very enjoyable to develop because it includes unique features that require creative solutions. Thank you for the opportunity!