
export default function DashboardLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="flex h-screen bg-muted/40">
            <div className="flex-1 flex flex-col ml-64">
                <main className="flex-1 overflow-y-auto p-6 mt-16">
                    {children}
                </main>
            </div>
        </div>
    );
}
