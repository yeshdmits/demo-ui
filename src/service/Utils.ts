function formatDate(inputDate: string) {
    // Parse the input date string
    const date = new Date(inputDate);

    // Extract date components
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');

    // Assemble the formatted date string
    const formattedDate = `${day}-${month}-${year} ${hours}:${minutes}`;

    return formattedDate;
}

export { formatDate }