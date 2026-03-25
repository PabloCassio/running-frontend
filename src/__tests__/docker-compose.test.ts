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

describe('Behavior 2: volumes de infraestrutura não pertencem ao frontend', () => {
  it('não deve declarar o volume postgres_data', () => {
    expect(content).not.toContain('postgres_data')
  })

  it('não deve declarar o volume redis_data', () => {
    expect(content).not.toContain('redis_data')
  })
})

describe('Behavior 3: rede isolada não deve ser declarada no frontend', () => {
  it('não deve declarar a rede maratona-frontend-network', () => {
    expect(content).not.toContain('maratona-frontend-network')
  })
})

describe('Behavior 4: serviço frontend mantém configuração correta', () => {
  it('deve conter o serviço frontend', () => {
    expect(content).toMatch(/^ {2}frontend:\s*$/m)
  })

  it('deve expor a porta 3000', () => {
    expect(content).toContain('3000:3000')
  })

  it('deve configurar VITE_API_URL apontando para localhost:5000', () => {
    expect(content).toContain('VITE_API_URL: http://localhost:5000')
  })
})
