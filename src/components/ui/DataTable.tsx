'use client';

import { useState } from 'react';
import {
    ChevronLeft,
    ChevronRight,
    ChevronsLeft,
    ChevronsRight,
    ArrowUpDown
} from 'lucide-react';
import { cn } from '@/lib/utils';

interface Column<T> {
    header: string;
    accessorKey: keyof T;
    cell?: (row: T) => React.ReactNode;
}

interface DataTableProps<T> {
    data: T[];
    columns: Column<T>[];
    pageSize?: number;
}

export function DataTable<T extends { id: string | number }>({
    data,
    columns,
    pageSize = 10
}: DataTableProps<T>) {
    const [currentPage, setCurrentPage] = useState(1);
    const totalPages = Math.ceil(data.length / pageSize);

    const paginatedData = data.slice(
        (currentPage - 1) * pageSize,
        currentPage * pageSize
    );

    return (
        <div className="w-full bg-background rounded-lg shadow-sm border border-border overflow-hidden">
            <div className="overflow-x-auto">
                <table className="w-full text-sm text-left">
                    <thead className="text-xs text-muted-foreground uppercase bg-muted/50 border-b border-border">
                        <tr>
                            {columns.map((col) => (
                                <th key={String(col.accessorKey)} className="px-6 py-3 font-medium">
                                    <div className="flex items-center space-x-1 cursor-pointer hover:text-foreground">
                                        <span>{col.header}</span>
                                        <ArrowUpDown className="w-3 h-3" />
                                    </div>
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-border">
                        {paginatedData.map((row) => (
                            <tr key={row.id} className="hover:bg-muted/50 transition-colors">
                                {columns.map((col) => (
                                    <td key={`${row.id}-${String(col.accessorKey)}`} className="px-6 py-4 whitespace-nowrap text-foreground">
                                        {col.cell ? col.cell(row) : String(row[col.accessorKey])}
                                    </td>
                                ))}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            <div className="flex items-center justify-between px-6 py-4 border-t border-border bg-muted/50">
                <div className="text-sm text-muted-foreground">
                    Showing <span className="font-medium">{(currentPage - 1) * pageSize + 1}</span> to{' '}
                    <span className="font-medium">{Math.min(currentPage * pageSize, data.length)}</span> of{' '}
                    <span className="font-medium">{data.length}</span> results
                </div>
                <div className="flex items-center space-x-2">
                    <button
                        onClick={() => setCurrentPage(1)}
                        disabled={currentPage === 1}
                        className="p-2 rounded-md hover:bg-accent disabled:opacity-50 disabled:cursor-not-allowed text-foreground"
                    >
                        <ChevronsLeft className="w-4 h-4" />
                    </button>
                    <button
                        onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                        disabled={currentPage === 1}
                        className="p-2 rounded-md hover:bg-accent disabled:opacity-50 disabled:cursor-not-allowed text-foreground"
                    >
                        <ChevronLeft className="w-4 h-4" />
                    </button>
                    <span className="text-sm font-medium text-foreground">
                        Page {currentPage} of {totalPages}
                    </span>
                    <button
                        onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                        disabled={currentPage === totalPages}
                        className="p-2 rounded-md hover:bg-accent disabled:opacity-50 disabled:cursor-not-allowed text-foreground"
                    >
                        <ChevronRight className="w-4 h-4" />
                    </button>
                    <button
                        onClick={() => setCurrentPage(totalPages)}
                        disabled={currentPage === totalPages}
                        className="p-2 rounded-md hover:bg-accent disabled:opacity-50 disabled:cursor-not-allowed text-foreground"
                    >
                        <ChevronsRight className="w-4 h-4" />
                    </button>
                </div>
            </div>
        </div>
    );
}
