/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        serif: ['Playfair Display', 'serif'],
      },
      typography: (theme) => ({
        DEFAULT: {
          css: {
            '--tw-prose-body': theme('colors.zinc[800]'),
            '--tw-prose-headings': theme('colors.zinc[900]'),
            '--tw-prose-links': theme('colors.blue[600]'),
            '--tw-prose-bold': theme('colors.zinc[900]'),
            '--tw-prose-quotes': theme('colors.zinc[900]'),
            '--tw-prose-quote-borders': theme('colors.zinc[200]'),
            
            // Adjust headings for editorial feel
            h1: { fontFamily: theme('fontFamily.serif')[0], fontWeight: '700', letterSpacing: '-0.025em' },
            h2: { fontFamily: theme('fontFamily.serif')[0], fontWeight: '700', letterSpacing: '-0.025em', borderBottom: `1px solid ${theme('colors.zinc[100]')}`, paddingBottom: '0.5rem' },
            h3: { fontFamily: theme('fontFamily.sans')[0], fontWeight: '600' },
            
            // Enhance links and underlines
            a: {
              color: 'var(--tw-prose-links)',
              textDecoration: 'none',
              borderBottom: `1px solid ${theme('colors.blue[200]')}`,
              transition: 'border-color 0.2s, color 0.2s',
              '&:hover': {
                color: theme('colors.blue[700]'),
                borderBottomColor: theme('colors.blue[700]'),
              },
            },
            
            // Refine quotes (glassmorphism feel)
            blockquote: {
              fontWeight: '400',
              fontStyle: 'italic',
              color: 'var(--tw-prose-quotes)',
              borderLeftWidth: '0.25rem',
              borderLeftColor: 'var(--tw-prose-quote-borders)',
              backgroundColor: theme('colors.zinc[50]'),
              padding: '1rem 1.5rem',
              borderRadius: '0 0.5rem 0.5rem 0',
              quotes: '"\\201C""\\201D""\\2018""\\2019"',
            },
            
            // Enhance images
            img: {
              borderRadius: theme('borderRadius.2xl'),
              boxShadow: theme('boxShadow.lg'),
              marginTop: '2em',
              marginBottom: '2em',
              width: '100%', // full bleed
            },
            
            // Ensure underlines show correctly (since TipTap uses <u> tags)
            u: {
              textDecoration: 'underline',
              textUnderlineOffset: '4px',
              textDecorationThickness: '1px',
              textDecorationColor: theme('colors.zinc[300]')
            },

            // Text alignment support for TipTap
            '.text-left': { textAlign: 'left' },
            '.text-center': { textAlign: 'center' },
            '.text-right': { textAlign: 'right' },
          },
        },
        invert: {
          css: {
            '--tw-prose-body': theme('colors.zinc[300]'),
            '--tw-prose-headings': theme('colors.white'),
            '--tw-prose-links': theme('colors.blue[400]'),
            '--tw-prose-bold': theme('colors.white'),
            '--tw-prose-quotes': theme('colors.zinc[100]'),
            '--tw-prose-quote-borders': theme('colors.zinc[700]'),
            h2: { borderBottomColor: theme('colors.zinc[800]') },
            a: {
              borderBottomColor: theme('colors.blue[800]'),
              '&:hover': { color: theme('colors.blue[300]'), borderBottomColor: theme('colors.blue[300]') },
            },
            blockquote: { backgroundColor: 'rgba(255, 255, 255, 0.03)' },
            u: { textDecorationColor: theme('colors.zinc[600]') },
          },
        },
      }),
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
}
