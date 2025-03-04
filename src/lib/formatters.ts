
// Format currency (NGN - Nigerian Naira)
export const formatCurrency = (amount: number): string => {
  return new Intl.NumberFormat('en-NG', {
    style: 'currency',
    currency: 'NGN',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  }).format(amount);
};

// Format date
export const formatDate = (dateString: string): string => {
  const options: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  };
  
  return new Date(dateString).toLocaleDateString('en-NG', options);
};

// Format short date (MM/DD/YYYY)
export const formatShortDate = (dateString: string): string => {
  const options: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit'
  };
  
  return new Date(dateString).toLocaleDateString('en-NG', options);
};

// Format percentage
export const formatPercentage = (value: number): string => {
  return new Intl.NumberFormat('en-NG', {
    style: 'percent',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  }).format(value / 100);
};

// Format number with comma separators
export const formatNumber = (value: number): string => {
  return new Intl.NumberFormat('en-NG').format(value);
};

// Calculate age from date of birth
export const calculateAge = (dateOfBirth: string): number => {
  const today = new Date();
  const birthDate = new Date(dateOfBirth);
  let age = today.getFullYear() - birthDate.getFullYear();
  const m = today.getMonth() - birthDate.getMonth();
  
  if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
    age--;
  }
  
  return age;
};

// Format phone number
export const formatPhoneNumber = (phoneNumber: string): string => {
  // Remove non-digit characters
  const cleaned = phoneNumber.replace(/\D/g, '');
  
  // Format based on Nigerian number pattern (+234 XXX XXX XXXX)
  if (cleaned.length === 13 && cleaned.startsWith('234')) {
    return `+${cleaned.slice(0, 3)} ${cleaned.slice(3, 6)} ${cleaned.slice(6, 9)} ${cleaned.slice(9)}`;
  }
  
  // For numbers starting with 0
  if (cleaned.length === 11 && cleaned.startsWith('0')) {
    return `+234 ${cleaned.slice(1, 4)} ${cleaned.slice(4, 7)} ${cleaned.slice(7)}`;
  }
  
  // Return original if it doesn't match expected patterns
  return phoneNumber;
};
