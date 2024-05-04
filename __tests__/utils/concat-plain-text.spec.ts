import { describe, test, expect } from 'vitest'
import { concatPlainText } from '@utils/concat-plain-text.js'

describe('concatPlainText', () => {
  test('RFC', () => {
    const text =
      '   The Hypertext Transfer Protocol (HTTP) [RFC7230] provides compatible' + '\n'
    + '   resource-level semantics across different versions, but it does not' + '\n'
    + '   offer compatibility at the connection-management level.  Other' + '\n'
    + '   protocols that rely on connection-management details of HTTP, such as' + '\n'
    + '   WebSockets, must be updated for new versions of HTTP.' + '\n'

    const result = concatPlainText(text)

    expect(result).toBe(
      'The Hypertext Transfer Protocol (HTTP) [RFC7230] provides compatible '
    + 'resource-level semantics across different versions, but it does not '
    + 'offer compatibility at the connection-management level. Other '
    + 'protocols that rely on connection-management details of HTTP, such as '
    + 'WebSockets, must be updated for new versions of HTTP.'
    )
  })

  test('PDF', () => {
    const text =
      'Demon’s Souls by From Sofware released in 2009 was a turning point for the' + '\n'
    + 'game industry and for the studio. Built of their previous game series King’s Field' + '\n'
    + '(frst released in 1994), Demon’s Souls was an action RPG where players explored' + '\n'
    + 'massive environments, dodging traps and fghting monsters (Figure 8.1).' + '\n'
    + 'Te game’s mantra of “Tough, but fair” could be seen throughout its gameplay' + '\n'
    + 'loop. Combat was real-time with a huge emphasis on positioning and managing' + '\n'
    + 'stamina. Te player could not just mash the attack button and expect to win. The' + '\n'
    + 'game bufered button inputs – meaning it would queue up the next command the' + '\n'
    + 'player pressed while the animation they were in was still going. Paying attention' + '\n'
    + 'to dodging or blocking attacks became essential when it came to the many fghts.'

    const result = concatPlainText(text)

    expect(result).toBe(
      'Demon’s Souls by From Sofware released in 2009 was a turning point for the '
    + 'game industry and for the studio. Built of their previous game series King’s Field '
    + '(frst released in 1994), Demon’s Souls was an action RPG where players explored '
    + 'massive environments, dodging traps and fghting monsters (Figure 8.1). '
    + 'Te game’s mantra of “Tough, but fair” could be seen throughout its gameplay '
    + 'loop. Combat was real-time with a huge emphasis on positioning and managing '
    + 'stamina. Te player could not just mash the attack button and expect to win. The '
    + 'game bufered button inputs – meaning it would queue up the next command the '
    + 'player pressed while the animation they were in was still going. Paying attention '
    + 'to dodging or blocking attacks became essential when it came to the many fghts.'
    )
  })
})
