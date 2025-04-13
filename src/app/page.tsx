'use client';

import Image from "next/image";
import Link from "next/link";
import { FaLaptop, FaUserTie, FaCheckCircle } from "react-icons/fa";
import { useLanguage } from "../contexts/LanguageContext";

export default function Home() {
  const { t } = useLanguage();

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-blue-900 to-blue-700 text-white py-24 pt-28">
        <div className="container mx-auto px-4 z-10 relative">
          <div className="flex flex-col md:flex-row items-center">
            <div className="md:w-1/2 mb-10 md:mb-0">
              <h1 className="text-4xl md:text-5xl font-bold leading-tight mb-6">
                {t('home.hero.title')}
              </h1>
              <p className="text-xl mb-8 text-blue-100">
                {t('home.hero.subtitle')}
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link href="/opdracht" className="btn btn-primary px-8 py-3 text-center rounded-lg font-semibold">
                  {t('home.hero.postJob')}
                </Link>
                <Link href="/contact" className="btn btn-secondary bg-white text-blue-900 px-8 py-3 text-center rounded-lg font-semibold">
                  {t('home.hero.contact')}
                </Link>
              </div>
            </div>
            <div className="md:w-1/2 flex justify-center">
              <div className="w-[500px] h-[400px] bg-blue-800 rounded-lg flex items-center justify-center text-white text-xl">
                Remote werkende professionals
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Voordelen Section */}
      <section className="py-20 bg-gray-50 dark:bg-gray-800">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12 text-[color:var(--text-dark)] dark:text-[color:var(--text-light)]">
            {t('home.benefits.title')}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white dark:bg-gray-900 p-6 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
              <div className="text-[color:var(--primary-color)] text-4xl mb-4 flex justify-center">
                <FaLaptop />
              </div>
              <h3 className="text-xl font-semibold mb-3 text-center text-[color:var(--text-dark)] dark:text-[color:var(--text-light)]">
                {t('home.benefits.network.title')}
              </h3>
              <p className="text-gray-600 dark:text-gray-400 text-center">
                {t('home.benefits.network.desc')}
              </p>
            </div>

            <div className="bg-white dark:bg-gray-900 p-6 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
              <div className="text-[color:var(--primary-color)] text-4xl mb-4 flex justify-center">
                <FaUserTie />
              </div>
              <h3 className="text-xl font-semibold mb-3 text-center text-[color:var(--text-dark)] dark:text-[color:var(--text-light)]">
                {t('home.benefits.matching.title')}
              </h3>
              <p className="text-gray-600 dark:text-gray-400 text-center">
                {t('home.benefits.matching.desc')}
              </p>
            </div>

            <div className="bg-white dark:bg-gray-900 p-6 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
              <div className="text-[color:var(--primary-color)] text-4xl mb-4 flex justify-center">
                <FaCheckCircle />
              </div>
              <h3 className="text-xl font-semibold mb-3 text-center text-[color:var(--text-dark)] dark:text-[color:var(--text-light)]">
                {t('home.benefits.process.title')}
              </h3>
              <p className="text-gray-600 dark:text-gray-400 text-center">
                {t('home.benefits.process.desc')}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-blue-50 dark:bg-blue-900">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6 text-[color:var(--primary-color)] dark:text-blue-300">
            {t('home.cta.title')}
          </h2>
          <p className="text-lg mb-8 text-gray-700 dark:text-gray-300 max-w-3xl mx-auto">
            {t('home.cta.desc')}
          </p>
          <Link href="/opdracht" className="btn btn-primary px-8 py-3 text-lg rounded-lg font-semibold">
            {t('home.cta.button')}
          </Link>
        </div>
      </section>
    </div>
  );
}
