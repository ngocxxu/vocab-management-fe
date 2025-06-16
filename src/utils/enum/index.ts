export enum Breakpoint {
  XL = 1200,
  LG = 1024,
  MD = 768
}

export enum EActionSocket {
  DELETED = 'deleted',
  CREATED = 'created',
  UPDATED = 'updated',
  MULTI_DELETED = 'multi-deleted',
  MULTI_CREATED = 'multi-created'
}

export enum ETypeSocket {
  VOCAB = 'vocab',
  COMMENT = 'comment',
  VOCAB_TRAINER = 'vocab-trainer',
  VOCAB_SUBJECT = 'vocab-subject',
  SYSTEM = 'system'
}

export enum EEmitSocket {
  VOCAB_NOTIFICATION = 'vocab-notification',
  COMMENT_NOTIFICATION = 'comment-notification',
  VOCAB_TRAINER_NOTIFICATION = 'vocab-trainer-notification',
  VOCAB_SUBJECT_NOTIFICATION = 'vocab-subject-notification',
  SYSTEM_NOTIFICATION = 'system-notification'
}
