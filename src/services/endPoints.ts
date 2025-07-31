export const Auth = {
  signup: '/auth/signup',
  signin: '/auth/signin',
  oauth: '/auth/oauth',
  verify: '/auth/verify',
  refresh: '/auth/refresh',
  signout: '/auth/signout',
  resetPassword: '/auth/reset-password',
  verifyOtp: '/auth/verify-otp',
  resendConfirmation: '/auth/resend-confirmation',
  logoutAllDevice: '/auth/logout-all-device'
}

export const Vocab = {
  getAll: '/vocab',
  create: '/vocab',
  update: (id: string) => `/vocab/${id}`,
  delete: (id: string) => `/vocab/${id}`,
  bulkCreate: '/vocab/bulk',
  bulkDelete: '/vocab/deleteIds',
  random: (count: number) => `/vocab/random/${count}`
}

export const VocabSubject = {
  getAll: '/vocabSubject',
  create: '/vocabSubject',
  update: (id: string) => `/vocabSubject/${id}`,
  delete: (id: string) => `/vocabSubject/${id}`,
  reorder: '/vocabSubject/reorder'
}

export const VocabTrainer = {
  getAll: '/vocabTrainer',
  create: '/vocabTrainer',
  delete: (id: string) => `/vocabTrainer/${id}`,
  bulkDelete: '/vocabTrainer/deleteIds',
  getQuestions: (id: string) => `/vocabTrainer/question/${id}`,
  submitTest: (id: string) => `/vocabTrainer/test/${id}`,
  getVocabTrainer: (id: string) => `/vocabTrainer/${id}`,
  createQuestion: '/vocabTrainer/question'
}

export const Notification = {
  getAll: (userId: string) => `/notification/${userId}`,
  getUnread: (userId: string) => `/notification/unread/${userId}`,
  markAsRead: '/notification/mark',
  markAllAsRead: '/notification/mark-all'
}

export const Dashboard = {
  getPosts: '/vocab'
}
