import SideNav from '@/app/ui/ad-rate/sidebar';

export default function Layout({ children }: { children: React.ReactNode }) {
    return (
        <div className="flex h-screen flex-col md:flex-row md:overflow-hidden">
            <div className="w-full flex-none md:w-52">
                <SideNav />
            </div>
            <div className="flex-grow p-6 md:overflow-y-auto md:p-6">{children}</div>
        </div>
    );
}