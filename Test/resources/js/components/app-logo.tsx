export default function AppLogo() {
    return (
        <>
            <div className="flex aspect-square size-12 items-center justify-center rounded-md">
                <img src="/Tickora-logo.png" alt="Tickora Logo" className="size-7 object-contain" />
            </div>
            <div className="ml-0.1 grid flex-1 text-left text-sm">
                <span className="mb-0.1 truncate leading-tight font-semibold">Tickora</span>
            </div>
        </>
    );
}
