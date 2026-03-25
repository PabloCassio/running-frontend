import { readFileSync } from 'fs'
import { resolve } from 'path'
import { describe, it, expect, beforeAll } from 'vitest'

let content: string

beforeAll(() => {
  content = readFileSync(resolve(process.cwd(), 'docker-compose.yml'), 'utf-8')
})

describe('Behavior 1: serviços de infraestrutura não pertencem ao frontend', () => {
  it('não deve conter o serviço backend', () => {
    expect(content).not.toMatch(/^ {2}backend:\s*$/m)
  })

  it('não deve conter o serviço postgres', () => {
    expect(content).not.toMatch(/^ {2}postgres:\s*$/m)
  })

  it('não deve conter o serviço redis', () => {
    expect(content).not.toMatch(/^ {2}redis:\s*$/m)
  })
})
