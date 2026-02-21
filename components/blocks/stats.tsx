import { Section } from "../layout/section";

export const Stats = ({ data }: { data: any }) => {
    return (
        <Section
            background={data.style?.background || (data as any).background || undefined}
            padding={data.style?.padding || undefined}
            width={data.style?.width || undefined}
            alignment={data.style?.alignment || undefined}
            className="py-16 md:py-24"
            fullBleed={false}
        >
            <div className="mx-auto w-full space-y-12 px-6 md:px-12">
                <div className="text-center">
                    <h2 className="text-3xl font-bold uppercase tracking-wide text-foreground md:text-4xl">{data.title}</h2>
                    {data.description && (
                        <p className="mx-auto mt-4 max-w-2xl text-lg text-muted-foreground">{data.description}</p>
                    )}
                </div>

                <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-3 md:gap-0 rounded-3xl bg-card/50 dark:bg-card/5 p-8 ring-1 ring-border/50 dark:ring-white/10 backdrop-blur-sm">
                    {data.stats?.map((stat: any, index: number) => (
                        <div key={stat?.type} className={`group flex flex-col items-center text-center p-8 transition-all duration-500 hover:-translate-y-1 ${index !== data.stats!.length - 1 ? 'md:border-r md:border-border/40' : ''}`}>
                            <dt className="text-sm font-bold uppercase tracking-[0.2em] text-primary/80">{stat!.type}</dt>
                            <dd className="mt-4 text-5xl font-bold tracking-tighter text-foreground md:text-6xl">{stat!.stat}</dd>
                        </div>
                    ))}
                </div>
            </div>
        </Section>
    )
}
