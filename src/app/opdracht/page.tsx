import OpdrachtSteps from '../../components/ui/OpdrachtSteps';
import ScrollInitializer from './ScrollInitializer';

export const metadata = {
  title: 'Opdracht Plaatsen - IT-Uitzendbureau',
  description: 'Plaats snel en eenvoudig je IT-opdracht via ons interactieve proces. Wij zorgen voor de perfecte match met IT-professionals.',
};

export default function OpdrachtPage() {
  return (
    <>
      <ScrollInitializer />
      <div className="container mx-auto px-4 py-12 pt-24">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-10">
            <h1 className="text-3xl md:text-4xl font-bold mb-4 text-[color:var(--text-dark)] dark:text-[color:var(--text-light)]">
              Plaats je IT-opdracht
            </h1>
            <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              We begeleiden je stap voor stap door het plaatsen van je IT-opdracht. 
              Na het indienen nemen we binnen 24 uur contact met je op om de details te bespreken.
            </p>
          </div>
          
          <div id="formulier" className="bg-white dark:bg-gray-900 p-8 rounded-lg shadow-md border border-gray-200 dark:border-gray-700 scroll-mt-24">
            <OpdrachtSteps />
          </div>
        </div>
      </div>
    </>
  );
} 