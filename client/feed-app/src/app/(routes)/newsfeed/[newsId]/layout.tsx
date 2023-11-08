import ScrollToTopButton from "@/app/components/ScrollToTopButton/ScrollToTopButton"

export default function PageLayout({
  children, 
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