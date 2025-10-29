import { parseISO, getYear, getMonth, getDate, addDays, differenceInDays, format, isSameDay, isWithinInterval, differenceInCalendarDays, startOfWeek, endOfWeek } from "date-fns";

interface FilterParams {
    year?: number | null;
    month?: number | null;
    period?: "annual" | "monthly" | "weekly" | "custom" | null;
    startDate?: string | null;
    endDate?: string | null;
}

interface Summary {
    label: string;
    year: number;
    month: string;
    date?: string;
    qty: number;
    total_sales: number;
}

interface DataSales {
    date: string; // format "YYYY-MM-DD"
    qty: number;
    total_sales: number;
    [key: string]: any;
}

const monthNames = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
];

export const FilterSalesData = (data: DataSales[], { year, month, period, startDate, endDate }: FilterParams) => {
    console.log(startDate, 'stardate')
    const now = new Date();
    const currentYear = now.getFullYear();
    const currentMonth = now.getMonth()

    // 1. Annual
    if (period === "annual") {
        const annualSummary: Summary[] = Object.values(
            data.reduce((acc: Record<number, Summary>, item) => {
                const year = new Date(item.date).getFullYear();
                if (!acc[year]) {
                    acc[year] = { year, qty: 0, total_sales: 0, label: '', month: '' };
                }
                acc[year].qty += item.qty;
                acc[year].total_sales += item.total_sales;
                return acc;
            }, {})
        );

        return { data: annualSummary, xDataKey: 'year' }
    }
    // 2. Monthly
    else if (period === "monthly") {
        // filter by year
        let filteredData = year
            ? data.filter(item => getYear(parseISO(item.date)) === year)
            : data;

        if (month && month != 0) {
            // filter specific month
            filteredData = filteredData.filter(item => getMonth(parseISO(item.date)) === month - 1); // month 1-12
        }

        const summary = Object.values(
            filteredData.reduce((acc: Record<string, Summary>, item) => {
                const date = parseISO(item.date);
                const year = getYear(date);
                const monthIndex = getMonth(date); // 0-11
                const d = getDate(date);

                let key: string;
                let label: string;

                if (month != 0) {
                    const week = Math.ceil(d / 7); // weeks1 - weeks5
                    key = `${year}-${monthIndex}-${week}`;
                    label = `week${week}`;
                } else {
                    // grup by month
                    key = `${year}-${monthIndex}`;
                    label = monthNames[monthIndex];
                }



                if (!acc[key]) {
                    acc[key] = {
                        label,
                        year,
                        qty: 0,
                        total_sales: 0,
                        month: ''
                    };
                }

                acc[key].qty += item.qty;
                acc[key].total_sales += item.total_sales;

                return acc;
            }, {})
        );

        summary.sort((a, b) => {
            if (month != 0) {
                // sort by week
                console.log('kesini?')
                return parseInt(a.label.replace("week", "")) - parseInt(b.label.replace("week", ""));
            } else {
                // sort by month
                const idxA = monthNames.indexOf(a.label);
                const idxB = monthNames.indexOf(b.label);
                console.log('kesana???', idxA, a, idxB, b)
                return a.year - b.year || idxA - idxB;
            }
        });

        return { data: summary, xDataKey: 'label' }

    }
    // 3. Weekly
    else if (period === "weekly") {
        const start = parseISO(startDate ? startDate : `${now}`);

        // bikin array 7 hari dari start date
        const weekDays = Array.from({ length: 7 }, (_, i) => addDays(start, i));

        // reduce untuk mengakumulasi qty & total_sales per hari
        const summaryMap: Record<string, Summary> = weekDays.reduce((acc, day) => {
            const key = day.toISOString().split("T")[0]; // YYYY-MM-DD
            acc[key] = {
                label: format(day, "dd MMM"), // label misal '15 Oct'
                date: key,
                qty: 0,
                total_sales: 0,
                year: 0,
                month: ''
            };
            return acc;
        }, {} as Record<string, Summary>);

        // loop dataSales, jika tanggal ada di weekDays, tambahkan qty & total_sales
        data.forEach(item => {
            const itemDate = parseISO(item.date);
            weekDays.forEach(day => {
                if (isSameDay(itemDate, day)) {
                    const key = day.toISOString().split("T")[0];
                    summaryMap[key].qty += item.qty;
                    summaryMap[key].total_sales += item.total_sales;
                }
            });
        });

        // ubah menjadi array & urutkan sesuai weekDays
        const weeklySummary = weekDays.map(day => {
            const key = day.toISOString().split("T")[0];
            return summaryMap[key];
        });

        return { data: weeklySummary, xDataKey: 'label' };
    }
    // 4. Custom range
    else if (period === "custom") {
        const start = parseISO(startDate ? startDate : '');
        const end = parseISO(endDate ? endDate : '');

        // filter data dalam range
        const filteredData = data.filter(item => {
            const date = parseISO(item.date);
            return isWithinInterval(date, { start, end });
        });

        const totalDays = differenceInCalendarDays(end, start) + 1;

        let summary: Summary[] = [];

        if (totalDays <= 7) {
            // per hari
            const allDays = Array.from({ length: totalDays }, (_, i) => addDays(start, i));
            const map = allDays.reduce((acc, day) => {
                const key = day.toISOString().split("T")[0];
                acc[key] = { label: format(day, "dd MMM"), year: getYear(day), qty: 0, total_sales: 0, month: '' };
                return acc;
            }, {} as Record<string, Summary>);

            filteredData.forEach(item => {
                const dayKey = parseISO(item.date).toISOString().split("T")[0];
                if (map[dayKey]) {
                    map[dayKey].qty += item.qty;
                    map[dayKey].total_sales += item.total_sales;
                }
            });

            summary = allDays.map(d => map[d.toISOString().split("T")[0]]);
        }
        else if (totalDays < 60) {
            // per minggu
            const weeks: { start: Date; end: Date }[] = [];
            let currentStart = startOfWeek(start, { weekStartsOn: 1 }); // minggu mulai Senin
            while (currentStart <= end) {
                const currentEnd = endOfWeek(currentStart, { weekStartsOn: 1 });
                weeks.push({ start: currentStart, end: currentEnd > end ? end : currentEnd });
                currentStart = addDays(currentEnd, 1);
            }

            const map: Record<string, Summary> = {};
            weeks.forEach((w, idx) => {
                map[`week${idx + 1}`] = { label: `week${idx + 1}`, year: getYear(w.start), qty: 0, total_sales: 0, month: '' };
            });

            filteredData.forEach(item => {
                const date = parseISO(item.date);
                weeks.forEach((w, idx) => {
                    if (isWithinInterval(date, w)) {
                        map[`week${idx + 1}`].qty += item.qty;
                        map[`week${idx + 1}`].total_sales += item.total_sales;
                    }
                });
            });

            summary = Object.values(map);
        }
        else if (totalDays >= 365) {
            // per tahun
            const map: Record<number, Summary> = {};
            filteredData.forEach(item => {
                const year = getYear(parseISO(item.date));
                if (!map[year]) map[year] = { label: `${year}`, year, qty: 0, total_sales: 0, month: '' };
                map[year].qty += item.qty;
                map[year].total_sales += item.total_sales;
            });
            summary = Object.values(map).sort((a, b) => a.year - b.year);
        }
        else {
            // per bulan
            const map: Record<string, Summary> = {};
            filteredData.forEach(item => {
                const date = parseISO(item.date);
                const key = `${getYear(date)}-${getMonth(date)}`;
                if (!map[key]) map[key] = { label: format(date, "MMM yyyy"), year: getYear(date), qty: 0, total_sales: 0, month: '' };
                map[key].qty += item.qty;
                map[key].total_sales += item.total_sales;
            });
            summary = Object.values(map).sort((a, b) => {
                const [yearA, monthA] = a.label.split(" ");
                const [yearB, monthB] = b.label.split(" ");
                return parseInt(yearA) - parseInt(yearB);
            });
        }

        return { data: summary, xDataKey: 'label' }
    }
    // default: bulan ini
    else if (period === null) {
        // filter data bulan & tahun sekarang
        const filteredData = data.filter(item => {
            const date = parseISO(item.date);
            return getYear(date) === currentYear && getMonth(date) === currentMonth;
        });

        // group per bulan (meskipun cuma 1 bulan)
        const summaryMap = filteredData.reduce((acc: Record<string, Summary>, item) => {
            const date = parseISO(item.date);
            const year = getYear(date);
            const month = getMonth(date);
            const key = `${year}-${month}`;

            if (!acc[key]) {
                acc[key] = {
                    label: monthNames[month],
                    year,
                    qty: 0,
                    total_sales: 0,
                    month: ''
                };
            }

            acc[key].qty += item.qty;
            acc[key].total_sales += item.total_sales;

            return acc;
        }, {} as Record<string, Summary>);

        // ubah menjadi array & urutkan
        const summary = Object.values(summaryMap).sort((a, b) => a.year - b.year);

        return { data: summary, xDataKey: 'label' }
    } else {
        return { data: [], xDataKey: '' }
    }
};
