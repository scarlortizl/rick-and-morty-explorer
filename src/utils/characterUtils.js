const STATUS_DATA = {
  Alive: { label: 'Vivo', className: 'alive' },
  Dead: { label: 'Muerto', className: 'dead' },
  unknown: { label: 'Desconocido', className: 'unknown' },
};

const GENDER_LABELS = {
  Female: 'Femenino',
  Male: 'Masculino',
  Genderless: 'Sin género',
  unknown: 'Desconocido',
};

export function getStatusData(status) {
  return STATUS_DATA[status] ?? STATUS_DATA.unknown;
}

export function translateGender(gender) {
  return GENDER_LABELS[gender] ?? gender;
}

export function formatDate(dateString) {
  return new Intl.DateTimeFormat('es-EC', {
    day: '2-digit',
    month: 'long',
    year: 'numeric',
  }).format(new Date(dateString));
}
