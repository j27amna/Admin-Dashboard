export const apiVersion =
  process.env.NEXT_PUBLIC_SANITY_API_VERSION || '2025-02-07'

export const dataset = assertValue(
  process.env.NEXT_PUBLIC_SANITY_DATASET,
  'Missing environment variable: NEXT_PUBLIC_SANITY_DATASET'
)

export const projectId = assertValue(
  process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  'Missing environment variable: NEXT_PUBLIC_SANITY_PROJECT_ID'
)

export const token = assertValue(
"sk30wLXyzt9RFX8hgVXQytHiWRwaR6f4LGHtiuUAzH4GOw5k5ohpm5UqBgZM39Ww6zKD7bwepYXvaUvD33fs5IAUdgvGwIAxOxx6NKgp3WLYq2wZ727jcvgdZcZLyQ7uMarrAWxRzvYjBNennAnaU5P6mwduyKUdJa58ALqAIRiGvhFUxdd4",
  'Missing environment variable: SANITY_API_TOKEN'
)

function assertValue<T>(v: T | undefined, errorMessage: string): T {
  if (v === undefined) {
    throw new Error(errorMessage)
  }

  return v
}
