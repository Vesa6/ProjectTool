/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}", // path to all JS and JSX files for purging
    "./public/index.html",
  ],
  theme: {
    extend: {
      colors: {
        customButton: "#7289DA",
        customButtonHover: "#839DF8",
        customBg: "#44475A",
        navBarPadding: "#3F4463",
        navBarButton: "#777EAA",
        navBarButtonHover: "#626a9d",
        sideBarBg: "#3F4463",
      },
    },
  },
  plugins: [],
};
