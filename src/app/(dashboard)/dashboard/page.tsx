export default function DashboardPage() {
    return (
        <div>
            <h2 className="text-2xl font-bold mb-4 text-foreground">Welcome to Medixpert Admin</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-background p-6 rounded-lg shadow-sm border border-border">
                    <h3 className="text-lg font-semibold text-muted-foreground">Total Users</h3>
                    <p className="text-3xl font-bold mt-2 text-foreground">1,234</p>
                </div>
                <div className="bg-background p-6 rounded-lg shadow-sm border border-border">
                    <h3 className="text-lg font-semibold text-muted-foreground">Active Sessions</h3>
                    <p className="text-3xl font-bold mt-2 text-foreground">567</p>
                </div>
                <div className="bg-background p-6 rounded-lg shadow-sm border border-border">
                    <h3 className="text-lg font-semibold text-muted-foreground">Revenue</h3>
                    <p className="text-3xl font-bold mt-2 text-foreground">$12,345</p>
                </div>
            </div>
        </div>
    );
}
