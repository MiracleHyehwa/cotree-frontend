interface SearcyLayoutProps {
  children: React.ReactNode;
}

export default function SearchLayout({ children }: SearcyLayoutProps) {
  return (
    <div id="main-container" className="flex min-h-screen w-full flex-col items-center justify-start">
      {children}
      <div id="scroll-background" className="pointer-events-none -z-50 flex flex-col items-center">
        <div className="fixed inset-0 -z-50 bg-gray-100" />
        <div className="fixed bottom-0 top-0 -z-40 w-full bg-white max-w-limit" />
      </div>
    </div>
  );
}
