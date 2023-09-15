export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      images: {
        Row: {
          created_at: string
          crop_height: number
          crop_width: number
          filename: string
          id: string
          natural_height: number
          natural_width: number
          thumbnail_url: string
          updated_at: string
          upscaled: boolean
          url: string
          user_id: string | null
        }
        Insert: {
          created_at?: string
          crop_height?: number
          crop_width?: number
          filename?: string
          id?: string
          natural_height?: number
          natural_width?: number
          thumbnail_url?: string
          updated_at?: string
          upscaled?: boolean
          url?: string
          user_id?: string | null
        }
        Update: {
          created_at?: string
          crop_height?: number
          crop_width?: number
          filename?: string
          id?: string
          natural_height?: number
          natural_width?: number
          thumbnail_url?: string
          updated_at?: string
          upscaled?: boolean
          url?: string
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "images_user_id_fkey"
            columns: ["user_id"]
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
      }
      species: {
        Row: {
          county: string
          created_at: string
          date: string | null
          family: string
          gender: string[] | null
          id: string
          image: string | null
          kingdom: string
          latin: string
          order: string
          place: string
          species: string
          updated_at: string
          user_id: string | null
        }
        Insert: {
          county?: string
          created_at?: string
          date?: string | null
          family?: string
          gender?: string[] | null
          id?: string
          image?: string | null
          kingdom?: string
          latin?: string
          order?: string
          place?: string
          species?: string
          updated_at?: string
          user_id?: string | null
        }
        Update: {
          county?: string
          created_at?: string
          date?: string | null
          family?: string
          gender?: string[] | null
          id?: string
          image?: string | null
          kingdom?: string
          latin?: string
          order?: string
          place?: string
          species?: string
          updated_at?: string
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "species_image_fkey"
            columns: ["image"]
            referencedRelation: "images"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "species_user_id_fkey"
            columns: ["user_id"]
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}
