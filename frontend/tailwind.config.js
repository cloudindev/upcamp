/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                // UPCAMP Brand Colors
                'upcamp-cyan': '#26D0CE',
                'upcamp-cyan-hover': '#1FC7C5',
                'upcamp-cyan-light': '#7DE4E3',
                'upcamp-blue': '#3949AB',
                'upcamp-blue-dark': '#2E3B8F',
                'upcamp-blue-light': '#5E6FD8',

                // Status Colors
                'status-success': '#4CAF50',
                'status-warning': '#FFB74D',
                'status-error': '#EF5350',
                'status-info': '#26D0CE',

                // Reservation Status
                'res-pending': '#FFB74D',
                'res-pending-transfer': '#FF9800',
                'res-confirmed': '#4CAF50',
                'res-checked-in': '#26D0CE',
                'res-checked-out': '#90A4AE',
                'res-cancelled': '#EF5350',
                'res-blocked': '#B0BEC5',

                // Neutrals
                'surface': '#FFFFFF',
                'surface-variant': '#F5F7FA',
                'outline': '#E1E8ED',
                'text-primary': '#1A1F36',
                'text-secondary': '#6B7C93',
                'text-muted': '#9AA5B1',
            },
            fontFamily: {
                sans: ['Inter', 'system-ui', 'sans-serif'],
            },
            borderRadius: {
                'card': '12px',
                'button': '8px',
            },
            boxShadow: {
                'card': '0 2px 8px rgba(26, 31, 54, 0.08)',
                'card-hover': '0 4px 12px rgba(26, 31, 54, 0.12)',
            },
        },
    },
    plugins: [],
}
