import type { NextApiRequest, NextApiResponse } from 'next'
import OpenAI from 'openai'
import { SYSTEM_PROMPT, defaultModelSettings } from '../../config/conversation'

type ChatRequest = {
  messages: { role: 'user' | 'assistant' | 'system'; content: string }[]
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST')
    return res.status(405).json({ error: 'Method not allowed' })
  }

  // Support multiple env var names to match deployment configuration
  const apiKey = process.env.OPENAI_API_KEY || process.env.CFS_Key || process.env.CFS_KEY
  if (!apiKey) {
    return res.status(500).json({ error: 'Missing OPENAI_API_KEY' })
  }

  const body: ChatRequest = req.body
  if (!body?.messages?.length) {
    return res.status(400).json({ error: 'Missing messages' })
  }

  try {
    const client = new OpenAI({ apiKey })
    const response = await client.chat.completions.create({
      model: 'gpt-4o-mini',
      messages: [
        { role: 'system', content: SYSTEM_PROMPT },
        ...body.messages,
      ],
      temperature: defaultModelSettings.temperature,
    })

    const text = response.choices?.[0]?.message?.content ?? ''
    return res.status(200).json({ content: text })
  } catch (err: unknown) {
    // eslint-disable-next-line no-console
    console.error(err)
    return res.status(500).json({ error: 'AI request failed' })
  }
}


