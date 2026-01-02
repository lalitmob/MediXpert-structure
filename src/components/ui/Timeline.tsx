import { cn } from '@/lib/utils';

interface TimelineItem {
    id: string;
    title: string;
    description?: string;
    date: string;
    status?: 'completed' | 'current' | 'pending' | 'failed';
}

interface TimelineProps {
    items: TimelineItem[];
    className?: string;
}

export function Timeline({ items, className }: TimelineProps) {
    return (
        <div className={cn("flow-root", className)}>
            <ul role="list" className="-mb-8">
                {items.map((item, itemIdx) => (
                    <li key={item.id}>
                        <div className="relative pb-8">
                            {itemIdx !== items.length - 1 ? (
                                <span className="absolute top-4 left-4 -ml-px h-full w-0.5 bg-border" aria-hidden="true" />
                            ) : null}
                            <div className="relative flex space-x-3">
                                <div>
                                    <span className={cn(
                                        "h-8 w-8 rounded-full flex items-center justify-center ring-8 ring-background",
                                        item.status === 'completed' ? "bg-green-500" :
                                            item.status === 'failed' ? "bg-red-500" :
                                                item.status === 'current' ? "bg-blue-500" : "bg-muted"
                                    )}>
                                        {/* Optional Icon here */}
                                    </span>
                                </div>
                                <div className="flex min-w-0 flex-1 justify-between space-x-4 pt-1.5">
                                    <div>
                                        <p className="text-sm font-medium text-foreground">{item.title}</p>
                                        {item.description && <p className="mt-0.5 text-sm text-muted-foreground">{item.description}</p>}
                                    </div>
                                    <div className="whitespace-nowrap text-right text-sm text-muted-foreground">
                                        <time dateTime={item.date}>{item.date}</time>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
}
