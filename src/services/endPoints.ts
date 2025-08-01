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
  getAll: '/vocabs',
  create: '/vocabs',
  update: (id: string) => `/vocabs/${id}`,
  delete: (id: string) => `/vocabs/${id}`,
  bulkCreate: '/vocabs/bulk',
  bulkDelete: '/vocabs/ids',
  random: (count: number) => `/vocabs/random/${count}`
}

export const VocabSubject = {
  getAll: '/subjects',
  create: '/subjects',
  update: (id: string) => `/subjects/${id}`,
  delete: (id: string) => `/subjects/${id}`,
  reorder: '/subjects/reorder'
}

export const VocabTrainer = {
  getAll: '/vocab-trainers',
  create: '/vocab-trainers',
  delete: (id: string) => `/vocab-trainers/${id}`,
  bulkDelete: '/vocab-trainers/ids',
  getQuestions: (id: string) => `/vocab-trainers/question/${id}`,
  submitTest: (id: string) => `/vocab-trainers/test/${id}`,
  getVocabTrainer: (id: string) => `/vocab-trainers/${id}`,
  createQuestion: '/vocab-trainers/question'
}

export const Notification = {
  getAll: `/notifications/my`,
  getUnread: `/notifications/my/unread`,
  getUnreadCount: `/notifications/my/unread-count`,
  markAsRead: (id: string) => `/notifications/${id}/my/mark-as-read`,
  markAllAsRead: `/notifications/my/mark-all-as-read`,
  delete: (id: string) => `/notifications/${id}/my`
}

export const Dashboard = {
  getPosts: '/vocabs'
}

export const SSE = {
  getEvents: '/sse/events'
}