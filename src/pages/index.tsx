import type { GetStaticProps } from "next"
import Head from "next/head"
import Hero from "../components/organisms/Hero/hero"
import OptionsGrid from "../components/organisms/OptionsGrid/OptionsGrid"
import Panel from "../components/organisms/Panel/panel"

export default function HomePage() {
  return (
    <main className="home-page">
      <Head>
        <title>Interactive Maps</title>
        <meta
          name="description"
          content="Create custom maps to showcase your data. Choose a world or regional map, color countries and groups, add a title and legend, and export the result."
        />
      </Head>
      <Hero />
      <Panel />
      <OptionsGrid />
    </main>
  )
}

export const getStaticProps: GetStaticProps = async () => ({
  props: {},
  revalidate: 3600,
})
