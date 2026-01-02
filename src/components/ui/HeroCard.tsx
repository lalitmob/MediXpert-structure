import { ArrowUpRight, ArrowDownRight } from 'lucide-react';
import { cn } from '@/lib/utils';

interface HeroCardProps {
    title: string;
    value: string | number;
    change?: number;
    trend?: 'up' | 'down' | 'neutral';
    icon?: any;
    className?: string;
}

export function HeroCard({ title, value, change, trend, icon: Icon, className }: HeroCardProps) {
    return (
        <div className={cn("bg-background p-6 rounded-lg shadow-sm border border-border", className)}>
            <div className="flex items-center justify-between">
                <h3 className="text-sm font-medium text-muted-foreground uppercase tracking-wider">{title}</h3>
                {Icon && <Icon className="w-5 h-5 text-muted-foreground" />}
            </div>
            <div className="mt-2 flex items-baseline">
                <p className="text-3xl font-bold text-foreground">{value}</p>
                {change !== undefined && (
                    <span className={cn(
                        "ml-2 flex items-baseline text-sm font-semibold",
                        trend === 'up' ? "text-green-600" : trend === 'down' ? "text-red-600" : "text-muted-foreground"
                    )}>
                        {trend === 'up' ? <ArrowUpRight className="w-3 h-3 self-center shrink-0 mr-0.5" /> :
                            trend === 'down' ? <ArrowDownRight className="w-3 h-3 self-center shrink-0 mr-0.5" /> : null}
                        {Math.abs(change)}%
                    </span>
                )}
            </div>
        </div>
    );
}
