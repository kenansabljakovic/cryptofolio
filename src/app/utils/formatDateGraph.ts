const formatDateGraphs = (tick: string, days: string): string => {
  const date = new Date(tick);
  let formattedDate: string;

  if (days === '1') {
    formattedDate = date.toLocaleTimeString(undefined, {
      hour: '2-digit',
      minute: '2-digit',
      hour12: false,
    });
  } else if (['7', '14', '30'].includes(days)) {
    formattedDate = date.toLocaleDateString(undefined, {
      day: 'numeric',
      month: 'short',
    });
  } else if (['90', '180', '365', 'max'].includes(days)) {
    formattedDate = date.toLocaleDateString(undefined, {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
    });
  } else {
    formattedDate = date.toLocaleDateString();
  }

  return formattedDate;
};

export default formatDateGraphs;
