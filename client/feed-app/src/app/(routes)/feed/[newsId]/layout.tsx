import ScrollToTopButton from "@/app/components/ScrollToTopButton/ScrollToTopButton"

export default function PageLayout({
  children, // will be a page or nested layout
}: {
  children: React.ReactNode
}) {
  return (
    <>
      <main>{children}
        <ScrollToTopButton />
      </main>

    </>

  )
}