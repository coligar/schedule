import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'

import { useState } from 'react';
import { prisma } from '../lib/prisma';

interface IUser
{
  email: string;
  name: string;
  avatar?: string;
}

export async function getServerSideProps()
{
  const schedule = await prisma.schedule.findMany();
  return{
    props:{
      schedule: JSON.parse(JSON.stringify(schedule))
    }
  }
}

export default function Home(schedule : any)
{
  const [agenda, setAgenda] = useState(schedule);

  const create = async (data:IUser) => {
    try 
    {
      const response = await fetch('/api/user/create',
      {
        method: 'POST',
        body: JSON.stringify(data),
        headers:{
          'Content-Type': 'application/json'
        }
      })

      if(!response.ok)
      {
        throw new Error(response.statusText);
      }

      return await response.json();
    } 
    catch (error) 
    {
      console.log('Failure')
    }
  }

  return (
    <div className={styles.container}>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>
          Welcome to <a href="https://nextjs.org">Next.js!</a>
        </h1>

        <p className={styles.description}>
          Get started by editing{' '}
          <code className={styles.code}>pages/index.tsx</code>
        </p>

        <div className={styles.grid}>
          <a href="https://nextjs.org/docs" className={styles.card}>
            <h2>Documentation &rarr;</h2>
            <p>Find in-depth information about Next.js features and API.</p>
          </a>

          <a href="https://nextjs.org/learn" className={styles.card}>
            <h2>Learn &rarr;</h2>
            <p>Learn about Next.js in an interactive course with quizzes!</p>
          </a>

          <a
            href="https://github.com/vercel/next.js/tree/canary/examples"
            className={styles.card}
          >
            <h2>Examples &rarr;</h2>
            <p>Discover and deploy boilerplate example Next.js projects.</p>
          </a>

          <a
            href="https://vercel.com/new?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
            target="_blank"
            rel="noopener noreferrer"
            className={styles.card}
          >
            <h2>Deploy &rarr;</h2>
            <p>
              Instantly deploy your Next.js site to a public URL with Vercel.
            </p>
          </a>

          <a
            href="#"
            rel="noopener noreferrer"
            className={styles.card}
            onClick={() => create({email:'simone@gmail.com', name: 'Simone Corrêa', avatar:'https://www.torredevigilancia.com/wp-content/uploads/2019/10/coringa-55.jpg'})}
          >
            <h2>Agenda</h2>
            <p >
              
            </p>
            <p>
             
            </p>
          </a>
        </div>
      </main>

      <footer className={styles.footer}>
        <a
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by{' '}
          <span className={styles.logo}>
            <Image src="/vercel.svg" alt="Vercel Logo" width={72} height={16} />
          </span>
        </a>
      </footer>
    </div>
  )
}
