import Header from './_compose/Header'

export default function PrivateLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Header />
      <div>
        <aside className="bg-gray-800 text-white px-6">Menu Privado</aside>
        <main className="flex-1 p-6">{children}</main>
      </div>
    </>
  )
}
