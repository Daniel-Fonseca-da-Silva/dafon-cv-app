import { NextRequest, NextResponse } from 'next/server'

const BACKEND_API_URL = process.env.BACKEND_API_URL

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    
    if (!id) {
      return NextResponse.json(
        { error: 'ID is required' },
        { status: 400 }
      )
    }

    // Fazer requisição para o backend externo
    const response = await fetch(`${BACKEND_API_URL}/curriculums/${encodeURIComponent(id)}`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${process.env.BACKEND_APIKEY}`,
        },
      }
    )

    if (!response.ok) {
      if (response.status === 404) {
        return NextResponse.json(
          { error: 'Curriculum not found' },
          { status: 404 }
        )
      }
      
      return NextResponse.json(
        { error: `Error searching curriculum: ${response.status}` },
        { status: response.status }
      )
    }

    const curriculumData = await response.json()
    
    return NextResponse.json(curriculumData)
    
  } catch (error) {
    console.error('Error in curriculum API:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    
    if (!id) {
      return NextResponse.json(
        { error: 'ID is required' },
        { status: 400 }
      )
    }

    // Fazer requisição para o backend externo
    const response = await fetch(`${BACKEND_API_URL}/curriculums/${encodeURIComponent(id)}`,
      {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${process.env.BACKEND_APIKEY}`,
        },
      }
    )

    if (!response.ok) {
      if (response.status === 404) {
        return NextResponse.json(
          { error: 'Curriculum not found' },
          { status: 404 }
        )
      }
      
      return NextResponse.json(
        { error: `Error deleting curriculum: ${response.status}` },
        { status: response.status }
      )
    }

    return NextResponse.json(
      { message: 'Curriculum deleted successfully' },
      { status: 200 }
    )
    
  } catch (error) {
    console.error('Error in curriculum API:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
