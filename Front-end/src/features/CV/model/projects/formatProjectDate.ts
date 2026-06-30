export const formatProjectDate = (date: string | null | undefined) => {
    if (!date) {
        return "Till now";
    }

    const parsedDate = new Date(date);

    if (Number.isNaN(parsedDate.getTime())) {
        return date;
    }

    return new Intl.DateTimeFormat("en-GB").format(parsedDate);
};