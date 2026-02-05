"use client"


export default function DashboardLayout({
    children,
    // SideMenu
}: Readonly<{
    children: React.ReactNode;
    // SideMenu: React.ReactNode;
}>) {

    return (
        <>
            {children}
        </>
    );
}
